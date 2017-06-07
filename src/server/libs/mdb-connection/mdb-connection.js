
/* eslint-disable no-console */
/* eslint-disable no-magic-numbers */
'use strict';

const MongoClient = require('mongodb').MongoClient;
const Promise = require('bluebird');


class MDBConnection {
  constructor(logger) {
    this._collections = {};
    this._models = {};
    this._db = null;
    this._reconnectTimer = null;
    this.lastError = null;
    this.isConnected = false;
    this.onConnectCallback = null;
    this.logger = logger || {info: console.log, error: console.error};
  }

  /**
   *
   * @param cb
   */
  onConnect(cb) {
    if (this.isConnected) cb();
    this.onConnectCallback = cb;
  }


  /**
   *
   * @param {Object} config
   * @param {String} config.uri
   * @param {Object} [config.options]
   */
  connect(config) {
    this.config = config;

    const uri = config.uri;
    const options = Object.assign({}, config.options || {}, {
      promiseLibrary: Promise
    });

    if (this._reconnectTimer) {
      clearTimeout(this._reconnectTimer);
    }

    return MongoClient
      .connect(uri, options)
      .then((db) => {
        this._db = db;
        this.isConnected = true;

        db.on('error', err => this._onError(err));
        db.on('close', () => this._onClose());
        db.on('reconnect', () => this._onReconnect());

        this.logger.info(`[MDB] connect: ${config.uri}`);

        return Promise
          .all(Object.keys(this._models).map((name) => {
            let item = this._models[name];
            if (this._collections[name]) return null;

            return this._createCollection(item.params);
          }))
          .then(() => {
            if (this.onConnectCallback) this.onConnectCallback();
          });
      })
      .catch((err) => {
        this.logger.error(err, `[MDB] can not connect to the mongodb, uri:${uri}`);
        return new Promise((resolve) => {
          setTimeout(() => resolve(this.connect(config)), 5000);
        });
      });
  }


  /**
   *
   * @param err
   * @private
   */
  _onError(err) {
    this.logger.error(err, 'MDB error');
    this.isConnected = false;
    this.lastError = err;
  }


  /**
   *
   * @private
   */
  _onClose() {
    const db = this._db;

    if (this._reconnectTimer) {
      clearTimeout(this._reconnectTimer);
    }

    this._reconnectTimer = setTimeout(() => {
      db.removeAllListeners('error');
      db.removeAllListeners('reconnect');
      db.removeAllListeners('close');

      this._collections = {};
      this._db = null;
      this.connect(this.config);
    }, 70 * 1000);

    this.isConnected = false;
  }


  /**
   *
   */
  _onReconnect() {
    if (this._reconnectTimer) {
      clearTimeout(this._reconnectTimer);
    }

    this.isConnected = true;
  }


  /**
   *
   * @param {Object} params
   * @param {String} params.name
   * @param {Object} [params.opts]
   * @param {Array} [params.indexes]
   * @param {Object} model
   * @returns {*}
   */
  collection(params, model) {
    const {name} = params;
    this._models[name] = {
      params,
      model
    };

    this._createCollection(params);

    return Object.keys(model)
      .reduce((obj, method) => {
        obj[method] = this._curryModelFn(model, method, name);
        return obj;
      }, {});
  }



  /**
   *
   * @param {Object} params
   * @param {String} params.name
   * @param {Object} [params.opts]
   * @param {Array} [params.indexes]
   * @private
   */
  _createCollection(params) {
    if (!this.isConnected) return;

    const {name, indexes} = params;
    const options = Object.assign({}, params.opts || {}, {strict: false});

    return this._db
      .createCollection(name, options)
      .then((collection) => {
        this._collections[name] = collection;

        if (indexes) {
          return collection.createIndexes(indexes);
        }
      })
      .catch((err) => {
        this.logger.error(err, '[MDB] failed create collection');
      });
  }


  /**
   *
   * @param model
   * @param method
   * @param collectionName
   * @returns {Function}
   * @private
   */
  _curryModelFn(model, method, collectionName) {
    return (a, b, c, d, e, f) => {
      const $ = this._collections[collectionName];

      //if (!this.isConnected || !$) {
      if (!$) {
        return Promise.reject(new Error('Database is unavailable'));
      }

      return model[method]($, a, b, c, d, e, f);
    };
  }
}


module.exports = MDBConnection;

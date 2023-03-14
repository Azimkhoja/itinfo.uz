const jwt = require("jsonwebtoken");
const config = require('config')
class JwtService {
  /**
   *
   * @param  secretKey
   * @param  expire
   */
  constructor(accessKey, refreshKey, accessTime, refreshTime) {
    this.accessKey = accessKey;
    this.refreshKey = refreshKey;
    this.accessTime = accessTime;
    this.refreshTime = refreshTime;
  }
  /**
   * Generate a token from supplied payload
   * @param  payload
   * @returns {*}
   */

  /**
   * verify token
   * @param token
   * @param callback
   * @returns {*}
   */
  async verifyAccess(token) {
    return jwt.verify(token, this.accessKey, {});
  }

  async verifyRefresh(token) {
    return jwt.verify(token, this.refreshKey, {});
  }

  generateTokens(payload){
    const accessToken = jwt.sign(payload, this.accessKey, {
      expiresIn: this.accessTime
    })
    const refreshToken = jwt.sign(payload, this.refreshTime, {
      expiresIn: this.refreshTime
    })
    return {
      accessToken,
      refreshToken
    }
  }
}
/**
 * Exports JwtService class
 * @type {JwtService}
 */
module.exports = new JwtService(
  
    config.get("access_key"),
    config.get("refresh_key"),
    config.get("access_time"),
    config.get("refresh_time"));
  // "AccessUchunKalit",
  // "RefreshTokengaKalit",
  // "15m",
  // "30d");


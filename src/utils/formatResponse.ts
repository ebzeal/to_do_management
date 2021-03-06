import { ResponseInterfaceDto } from "./types";
import { Response } from "express";
/**
 *
 * @description Method to send response in a generic format.
 * @param {*} res Express Response object
 * @param {number} code HTTP response status code
 * @param {string} status 'success' || 'failure'
 * @param {string} message Message to user
 * @param {object} error (optional) Error object
 * @param {object} payload (optional) Payload data to return with the response
 * @returns {object} Json response
 */

export default (resDto: ResponseInterfaceDto): Response => {
  const { res, code, status, message, error, payload } = resDto;
  return res.status(code).json({
    status,
    data: {
      statusCode: code,
      message,
      error,
      payload,
    },
  });
};

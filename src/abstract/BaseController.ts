import express from 'express'

export abstract class BaseController {

  constructor(childController?: any){
    if(childController !== undefined){
    Object.getOwnPropertyNames(childController.prototype)
      .filter((propertyName) => propertyName !== 'constructor')
      .forEach((method) => {
        (this[method] = this[method].bind(this));
      })
    }
  }

  public static jsonResponse (res: express.Response, code: number, message: string) {
    return res.status(code).json({ message })
  }

  public ok<T> (res: express.Response, dto?: T) {
    if (!!dto) {
      res.type('application/json');
      return res.status(200).json(dto);
    } else {
      return res.status(200).send();
    }
  }

  public created (res: express.Response) {
    return res.sendStatus(201);
  }

  public clientError (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 400, message ? message : 'Unauthorized');
  }

  public unauthorized (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 401, message ? message : 'Unauthorized');
  }

  public forbidden (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 403, message ? message : 'Forbidden');
  }

  public notFound (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 404, message ? message : 'Not found');
  }

  public conflict (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 409, message ? message : 'Conflict');
  }

  public tooMany (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 429, message ? message : 'Too many requests');
  }

  public failInput (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 422, message ? message : 'Unprocessable Entity');
  }

  public todo (res: express.Response) {
    return BaseController.jsonResponse(res, 400, 'TODO');
  }

  public fail (res: express.Response, error: Error | string) {
    return res.status(500).json({
      message: error.toString()
    })
  }
}
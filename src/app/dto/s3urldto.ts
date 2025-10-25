export class S3UrlDTO{
    url:string;
    error:string;

    // You can add a constructor to make initialization easier
    constructor(url:string,error:string) {
      this.url = url;
      this.error = error;
    }
}
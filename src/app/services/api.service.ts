import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) {}

    public post(dados = {}) {

      const headers = new HttpHeaders({
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'POST, GET, OPTIONS, PUT',
      'Accept':'application/json',
      'content-type':'application/json'});
  
       
      return this._http.post(
        API_URL,
        JSON.stringify(dados)
      );
    }
  
    public put( dados = {}) {
      const headers = new HttpHeaders({
        "access-control-request-method": "PUT",
        "Access-Control-Allow-Methods": "POST, GET,PUT, OPTIONS",
        "access-control-request-headers": ""
      }).set("Content-Type", "application/json");
      console.log(JSON.stringify(dados));
  
      return this._http.put(
        API_URL,
        JSON.stringify(dados)
      );
    }
  
  
    public get(dados = {}) {
   
      return this._http.get(
         API_URL,
        {
          params: dados
        }
      );
    }
  
  
    public delete(dados = {}) {
      return this._http.delete(
        API_URL,
        {
          params: dados,
          responseType: "text"
        }
      );
    }
  
   
    public async getPromise(dados = {}) {
      return this._http
        .get(API_URL, {
          params: dados
        })
        .toPromise()
        .then(resposta => {
          return resposta;
        })
        .catch(erro => {
          console.log(erro);
        });
    }
   }


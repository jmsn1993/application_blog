import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./config";

@Injectable({
  providedIn: "root"
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  // Service to get the posts created, paginated and sorted by date
  getPost(page, author, sort): Observable<any> {
    let httpHeaders = new HttpHeaders();
    let options = {
      headers: httpHeaders
    };
    let url = GLOBAL.url + `posts?_page=${page}&_sort=date&_order=${sort}`;
    // In case the author is not empty, the parameter author is add
    if (author != "") {
      url += `&author=${author}`;
    }

    return this.http.get(url, options).pipe();
  }

  // Service to get all the Authors created
  getAuthors(): Observable<any> {
    let httpHeaders = new HttpHeaders();
    let options = {
      headers: httpHeaders
    };
    return this.http.get(GLOBAL.url + "authors", options).pipe();
  }
  // Service to get all the Authors created
  getComments(idPost): Observable<any> {
    let httpHeaders = new HttpHeaders();
    let options = {
      headers: httpHeaders
    };
    return this.http
      .get(GLOBAL.url + `posts/${idPost}/comments`, options)
      .pipe();
  }


}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommunityTreeNode} from '../model/community-tree-node';
import {Observable} from 'rxjs';
import {LoggingService} from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  private baseUrl = 'http://localhost:8080/api/community/';

  constructor(private log: LoggingService, private http: HttpClient) {
  }

  public getCommunities(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl);
  }

  public getCommunityTree(): Observable<CommunityTreeNode[]> {

    return this.http.get<CommunityTreeNode[]>(this.baseUrl + 'tree');
  }

  public moveCommunity(community: string, parent: string): Observable<void> {

    const url = this.baseUrl + 'tree/' + community + '/parent/' + parent;

    this.log.log('url: ' + url);

    return this.http.post<void>(url, '');
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

import { IFolder } from '../models/folder.model';

@Injectable({
    providedIn: 'root'
})
export class FolderService {

    // Url
    protected foldersAll = environment.URL + '/folders';
    protected folderSingle = environment.URL + '/folders/{id}';


    constructor(private httpClient: HttpClient) { }



    getAllFolders(): Observable<any> {
        return this.httpClient.get(this.foldersAll);
    }

    getFolderById(id: number): Observable<any> {
        return this.httpClient.get(this.folderSingle.replace('{id}', id.toString()));
    }

    deleteFolder(id: number) {
        return this.httpClient.delete(this.folderSingle.replace('{id}', id.toString()));
    }

    putFolder(obj: IFolder) {
        return this.httpClient.post(this.foldersAll, obj);
    }
}

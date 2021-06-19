import { Component, OnInit } from '@angular/core';

import { FolderService } from '../../services/folder.service';
import { IFolder } from '../../models/folder.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit {
  foldersAll: IFolder[];
  show = false;
  folderSelected: IFolder;

  constructor(private folderService: FolderService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable(): void {
    this.folderService.getAllFolders().subscribe((res: IFolder[]) => {
      this.foldersAll = res;
    })
  }

  deleteFolder(folder) {
    this.folderService.deleteFolder(folder.id).subscribe(_ => {
      this.openSnackBar('Folder Deleted');
      this.loadTable();
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'X', {
      duration: 3000
    });
  }

  onSubmit() {
    if ((document.getElementById('addFolder') as HTMLFormElement).value != '') {
      const obj: IFolder = {
        id: 0,
        name: (document.getElementById('addFolder') as HTMLFormElement).value
      };
      this.folderService.putFolder(obj).subscribe(_ => {
        this.openSnackBar('Folder Created');
        this.loadTable();
        (document.getElementById('addFolder') as HTMLFormElement).value = '';
      })
    }
  }

  viewItems(folder) {
    this.show = !this.show;
    this.folderSelected = folder;
  }
}

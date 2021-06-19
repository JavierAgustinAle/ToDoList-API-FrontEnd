import { Component, OnDestroy, OnInit } from '@angular/core';

import { FolderService } from '../../services/folder.service';
import { IFolder } from '../../models/folder.model';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SubSink } from 'SubSink';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  foldersAll: IFolder[];
  show = false;
  folderSelected: IFolder;

  constructor(private folderService: FolderService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable(): void {
    this.subs.add(
      this.folderService.getAllFolders().subscribe((res: IFolder[]) => {
        this.foldersAll = res;
      })
    )
  }

  deleteFolder(folder): void {
    this.subs.add(
      this.folderService.deleteFolder(folder.id).subscribe(_ => {
        this.openSnackBar('Folder and it´s tasks deleted.');
        this.loadTable();
      })
    )
  }

  openSnackBar(message: string): void {
    this._snackBar.open(message, 'X', {
      duration: 3000
    });
  }

  onSubmit(): void {
    if ((document.getElementById('addFolder') as HTMLFormElement).value != '') {
      const obj: IFolder = {
        id: 0,
        name: (document.getElementById('addFolder') as HTMLFormElement).value
      };
      this.subs.add(
        this.folderService.putFolder(obj).subscribe(_ => {
          this.openSnackBar('Folder Created');
          this.loadTable();
          (document.getElementById('addFolder') as HTMLFormElement).value = '';
        })
      )
    }
  }

  viewItems(folder): void {
    this.show = !this.show;
    this.folderSelected = folder;
  }

  back() {
    this.show = !this.show;
    this.folderSelected = null;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

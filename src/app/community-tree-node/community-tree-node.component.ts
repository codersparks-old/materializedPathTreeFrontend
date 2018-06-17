import {Component, OnInit, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import {CommunityTreeNode} from '../model/community-tree-node';
import {MatDialog, MatMenuTrigger, MatSnackBar} from '@angular/material';
import {LoggingService} from '../service/logging.service';
import {CommunityService} from '../service/community.service';
import {MoveToDialogComponent} from '../move-to-dialog/move-to-dialog.component';

@Component({
  selector: 'app-community-tree-node',
  templateUrl: './community-tree-node.component.html',
  styleUrls: ['./community-tree-node.component.css']
})
export class CommunityTreeNodeComponent implements OnInit {

  @Input() node: CommunityTreeNode;
  @Input() communities: String[] = [];
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  @Output() reload: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private log: LoggingService,
    private communityService: CommunityService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar) {
  }

  ngOnInit() {
  }

  showMenu(e: MouseEvent, node: CommunityTreeNode): void {

    this.log.log('Right mouse click detected');
    this.log.log('Node:');
    this.log.log(node);

    e.preventDefault();
    e.stopImmediatePropagation();
    this.trigger.openMenu();
  }

  moveTo(community: CommunityTreeNode, parent: string): void {

    this.log.log('Moving ' + community.name + ' to ' + parent);
    this.communityService.moveCommunity(community.name, parent).subscribe(
      data => {
        this.snackbar.open('Community moved', '', {duration: 1500});
        this.reload.emit({community: community.name});
      },
      error => {
        this.snackbar.open('Error moving community: ' + error.error.message, '', {duration: 3000});
      }
    );

  }

  showMoveToDialog(node: CommunityTreeNode): void {
  }

}

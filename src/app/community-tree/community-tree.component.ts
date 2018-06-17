import {Component, OnInit, ViewChild} from '@angular/core';
import {CommunityService} from '../service/community.service';
import {CommunityTreeNode} from '../model/community-tree-node';
import {LoggingService} from '../service/logging.service';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';

import {of as observableOf} from 'rxjs';
import {MatMenuTrigger} from '@angular/material';

@Component({
  selector: 'app-community-tree',
  templateUrl: './community-tree.component.html',
  styleUrls: ['./community-tree.component.css']
})
export class CommunityTreeComponent implements OnInit {


  nestedTreeControl: NestedTreeControl<CommunityTreeNode>;
  nestedDataSource: MatTreeNestedDataSource<CommunityTreeNode>;

  communityTree: CommunityTreeNode[] = [];
  communities: string[] = [];

  constructor(
    private communityService: CommunityService,
    private log: LoggingService
  ) {
    this.nestedTreeControl = new NestedTreeControl<CommunityTreeNode>(this.getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource<CommunityTreeNode>();
  }

  ngOnInit() {
    this.loadTree();

    this.communityService.getCommunities().subscribe(data => {
      this.communities = data;
    });
  }


  public loadTree(): void {

    this.communityService.getCommunityTree().subscribe(
      data => {
        this.communityTree = data;
        this.log.log('Community Tree:');
        this.log.log(this.communityTree);

        this.nestedDataSource.data = data;
      }
    );
  }

  private getChildren = (node: CommunityTreeNode) => {
    return observableOf(node.children);
  }

  public hasChildren = (index: number, node: CommunityTreeNode) => {
    if (node.children) {
      return node.children.length > 0;
    }

    return false;
  }


}

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
public selectedIndex = 0;
  public subPages = [
    {
      title: 'Create Task',
      url: '/tasks/create'
    },
    {
      title: 'View Tasks',
      url: '/tasks/view'
    },
    {
      title: 'Manage Tasks',
      url: '/tasks/manage'
    }
  ];

  constructor(
    private router: Router
  ) { }

  returnHome() {
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  ngOnInit() {
  }

}

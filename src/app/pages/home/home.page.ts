import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Tasks',
      url: '/tasks'
    },
    {
      title: 'Storage',
      url: '/storage'
    },
    {
      title: 'Workers',
      url: '/workers'
    },
    {
      title: 'Mastermode',
      url: '/master'
    },
    {
      title: 'Wallet',
      url: '/wallet'
    },
    {
      title: 'Settings',
      url: '/settings'
    }
  ];

  constructor(
    // private router: Router,
    // private navCtrl: NavController
  ) { }

  // hideContent(event) {
  //   const newRoute = event.target.innerText.toLowerCase();
  //   document.getElementById('content').style.display = 'none';
  //   this.router.navigate([`/${newRoute}`], { replaceUrl: true });
  // }

  ngOnInit() {
  }
}

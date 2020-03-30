import { Router, Event, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
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
      url: '/workers',
      icon: '../../../assets/icon/workers-title.png'
    },
    {
      title: 'Mastermode',
      url: '/master'
    },
    {
      title: 'Wallet',
      url: '/wallet',
      icon: '../../../assets/icon/wallet_title.png'
    },
    {
      title: 'Settings',
      url: '/settings'
    }
  ];

  // https://www.joshmorony.com/converting-ionic-3-push-pop-navigation-to-angular-routing-in-ionic-4/
  constructor(
    private router: Router,
    private location: Location
  ) { }

  determinePage() {
    this.appPages.forEach((page, i) => {
      if (page.url === this.location.path()) {
        this.selectedIndex = i;
      }
    });
  }

  returnHome() {
    document.getElementById('content').style.display = 'none';
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  ngOnInit() {
    // Every time we change pages
    this.router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationEnd) {
        // see if we're on a page that hides the header bar
        if (event.url.includes('/home') || event.url.includes('/tasks')) {
          // this.hubPage = true;
          document.getElementById('header-bar').style.visibility = 'hidden';
        } else {
          // this.hubPage = false;
          this.determinePage();
          document.getElementById('header-bar').style.visibility = 'visible';
        }
      }
    });
  }
}

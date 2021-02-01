import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;

    constructor(private translate: TranslateService, public router: Router) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        var notifications =  [
        
            {
              user: 'Pema Lhadron',
              contact: '17465532',
              location: 'UNDP head Office',
              time:'12:00 AM 1/02/2020'
            },
            {
              user: 'Shara Pradhan',
              contact: '17465234',
              location: 'UNICEF Guest House',
              time:'12:00 AM 1/02/2020'
            },
            {
              user: 'Dawa Dem',
              contact: '17465532',
              location: 'Clock Tower',
              time:'12:00 AM 1/02/2020'
            },
            {
              user: 'Tenzin Nima',
              contact: '17465533',
              location: 'Ramada Hotel',
              time:'12:00 AM 1/02/2020'
            }
        ]
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}

import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import * as L from 'leaflet';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Inject } from '@angular/core';
import { ChatService, ChatServiceToken } from '@pazznetwork/ngx-chat';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()],
    providers: [NgbModalConfig, NgbModal]
})
export class DashboardComponent implements OnInit {

  
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];

    public tableHeader: string[] = [
        'user',
        'Contact Info',
        'Pickup Location',
        'Time',
        'Assign Driver',
      ];
     
  public data: object[] = [
    {
      user: 'Pema Lhadron,UNDP',
      contact: '17465532',
      location: 'UNDP head Office',
      time:'12:00 AM 1/02/2020'
    },
    {
      user: 'Shara Pradhan,UNDP',
      contact: '17465234',
      location: 'UNICEF Guest House',
      time:'12:00 AM 1/02/2020'
    },
    {
      user: 'Dawa Dem,UNDP',
      contact: '17465532',
      location: 'Clock Tower',
      time:'12:00 AM 1/02/2020'
    },
    {
      user: 'Tenzin Nima,UNDP',
      contact: '17465533',
      location: 'Ramada Hotel',
      time:'12:00 AM 1/02/2020'
    }
  ];

    public drivers =[
        {
          name:"Nima Yoezer",
          lat:27.477586 ,
          long:89.636292,
          contact_number: 17446623,
          status: "Free",
          status_short: 'free',
          vehicle: "Toyota Camry",
          vehicle_number:'BG-1-E1243'
        },
        {
          name:"Nima Yoezer",
          lat:27.458895, 
          long:89.650124 ,
          contact_number: 17446623,
          status_short: 'busy',
          status: "Dropping Dawa Dem to Upper Motithang",
          vehicle: "Toyota Camry",
          vehicle_number:'BG-1-E1243'
        },
        {
          name:"Nima Yoezer",
          lat:27.487878,
          long: 89.629001,
          contact_number: 17446623,
          status_short: 'busy',
          status: "picking up Pema Lhadron from UNDP head office",
          vehicle: "Toyota Camry",
          vehicle_number:'BG-1-E1243'
        }
    
      ]


    constructor(private modalService: NgbModal, @Inject(ChatServiceToken) chatService: ChatService) {
        chatService.logIn({
          domain: 'jabber.hot-chilli.net',
          service: 'wss://jabber.hot-chilli.net:5281/xmpp-websocket',
          password: '323395kt',
          username: 'un_admin',
        });

      


        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'First slide label',
                text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: 'Second slide label',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'Third slide label',
                text: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
    }

    ngOnInit() {

        var greenIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            shadowSize: [41, 41]
          });
          var redIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            shadowSize: [41, 41]
          });
              
        
      
      
          var mymaps = L.map('map2').setView([27.473017, 89.637579], 14);
          L.tileLayer('http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}').addTo(mymaps);
      
          function getIcon(status){
            if(status === "free"){
              return greenIcon
            }else{
              return redIcon
            }
          }
      
          for(let i=0; i<this.drivers.length; i++){
            console.log(); 
            var marker = L.marker([this.drivers[i].lat, this.drivers[i].long], {icon: getIcon(this.drivers[i].status_short)}).addTo(mymaps);
            marker.bindPopup(`
      
            <p style="padding:0;margin:0">Driver : ${this.drivers[i].name}</p>
            <p  style="padding:0;margin:0">Vehicle Number : ${this.drivers[i].vehicle_number}</p>
            <p  style="padding:0;margin:0">Status : ${this.drivers[i].status}</p>
            <p  style="padding:0;margin:0">Contact Number :${this.drivers[i].contact_number}</p>
            <hr>
            <button class="btn btn-sm btn-primary" type="button" style="width:100%" (click)="open(content)">Contact</button>
            `);
          }
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
    open(content) {
      this.modalService.open(content);
    }
}

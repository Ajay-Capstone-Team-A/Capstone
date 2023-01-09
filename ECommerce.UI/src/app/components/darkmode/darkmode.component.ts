import { Component, ElementRef, OnInit } from '@angular/core';


@Component({
  selector: 'app-darkmode',
  templateUrl: './darkmode.component.html',
  styleUrls: ['./darkmode.component.css']
})
export class DarkmodeComponent {
  status : string = "Off";
  useDark : boolean;
  // elementRef: ElementRef;
  
  constructor(){//elementRef: ElementRef) {
    this.useDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    // document.body.classList.add('dark-mode');
    this.toggle();
  }

  toggle() {
    this.status = this.useDark ? "On" : "Off";
    document.documentElement.classList.toggle("bootstrap-dark", this.useDark);
    try {
      // document.getElementById('navbar')?.classList.toggle("navbar-dark",this.useDark);
      // document.getElementById('navbar')?.classList.toggle("bg-dark",this.useDark);
      // document.getElementById('navbar')?.classList.toggle("navbar-light", !this.useDark);
      // document.getElementById('navbar')?.classList.toggle("bg-light", !this.useDark);
    }
    catch(error) {
      console.error();
    }

  }

}

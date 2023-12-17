import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router ) {}

  ngOnInit(): void {
    this.http.post("http://localhost:5001/api/Database/backup", null, { responseType: 'json' }).subscribe();
    alert("Backup was successfully created");
    this.router.navigateByUrl('home');
  }

}

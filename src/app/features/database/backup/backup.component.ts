import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent implements OnInit {

  constructor(private http: HttpClient ) {}

  ngOnInit(): void {
    this.http.post("http://localhost:5001/api/Database/backup", null, { responseType: 'json' }).subscribe();
  }

}

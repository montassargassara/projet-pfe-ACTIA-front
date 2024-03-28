import { Component, NgZone, OnInit, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from '../crud/employees/employees.component';
import { EmployeeService } from '../../_services/employees/employee.service';
import { TeamService } from '../../_services/teams/team.service';
import { TeamsComponent } from '../crud/teams/teams.component';
import { FileDownloadService } from '../../_services/file/file-download.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatDivider,
    EmployeesComponent,
    TeamsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  employeeCount: number | null = null;
  teamCount: number | null = null;

  constructor(
    private employeeService: EmployeeService,
    private teamService: TeamService,
    private fileDownloadService: FileDownloadService
    ) {}

  ngOnInit(): void {
    this.getCountOfEmployees();
    this.getCountOfTeams();
  }

  getCountOfEmployees() {
    this.employeeService.countEmployees().subscribe(count => {
      this.employeeCount = count;
    });
  }
  getCountOfTeams() {
    this.teamService.countTeams().subscribe(count => {
      this.teamCount = count;
    });
  }
  downloadFile(fileType: 'pdf' | 'excel'): void {
    const excelFileUrl = 'https://mohetn-my.sharepoint.com/personal/gassaramontasar_escs_u-sfax_tn/_layouts/15/download.aspx?sourcedoc=%7BE839593C-0BA2-4814-ACFD-D7E137DD309B%7D&file=Livre.xlsx';
    const pdfFileUrl = 'URL_TO_PDF';

    if (fileType === 'excel') {
      this.fileDownloadService.downloadFile(excelFileUrl, 'Livre.xlsx');
    } else if (fileType === 'pdf') {
      this.fileDownloadService.downloadFile(pdfFileUrl, 'Livre.pdf');
    }
  }
}
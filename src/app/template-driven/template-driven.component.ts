import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Addressing, CrudTempletDrivenService, Datas, PersonalData } from '../services/crud-templet-driven.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.scss']
})
export class TemplateDrivenComponent {

  displayedColumns: string[] = ['id', 'companyName', 'fName', 'lName', 'email', 'mobileNo', 'address', 'salary', 'adharNo', 'panNo', 'passbookNo', 'actions'];
  dataSource = new MatTableDataSource<any>;

  closeResult = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  allDatas?: Array<Datas> = new Array<Datas>();

  getDatas: Datas;

  constructor(private _crud: CrudTempletDrivenService, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.getDatas = new Datas;
    this.getDatas.address = new Addressing;
    this.getDatas.pernalDetails = new PersonalData;

    this.getDetail();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getDetail() {
    this._crud.getData().subscribe({
      next: (res) => {
        this.allDatas = res;
        this.dataSource = new MatTableDataSource(this.allDatas);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}

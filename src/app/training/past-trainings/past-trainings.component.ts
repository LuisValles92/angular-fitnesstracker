import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Exercise } from '../exercise.model';

import { TrainingService } from '../training.service';

import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit(): void {
    this.store.select(fromTraining.getFinishedExercises).subscribe(
      ex => {
        this.dataSource.data = ex;
      }
    );
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string): void {
    console.log(filterValue);
    // filterPredicate es un filtro que cuando se utiliza ya no se puede quitar
    // en este caso busca por nombre y su valor tiene que ser exacto para que este aparezca
    /*
    this.dataSource.filterPredicate = (data: Exercise, filter: string) => !filter || data.name == filterValue;
    this.dataSource.filter = filterValue;
    */
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

}

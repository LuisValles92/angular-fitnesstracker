import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { AngularFirestoreModule } from "angularfire2/firestore";

import { TrainingComponent } from "./training.component";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { StopTrainingModalComponent } from "./current-training/stop-training-modal.component";

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent,
        StopTrainingModalComponent
    ],
    imports: [
        SharedModule,
        AngularFirestoreModule
    ],
    entryComponents: [StopTrainingModalComponent]
})
export class TrainingModule { }
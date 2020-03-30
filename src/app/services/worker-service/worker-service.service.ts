// import { AngularFireDatabase } from 'angularfire2';
import { ComputeDevice } from './../../class/compute-device/compute-device';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import 'firebase/database';
import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  items: Observable<ComputeDevice[]>;

  constructor(private db: AngularFireDatabase) {
    this.items = db.list('items').valueChanges();
  }

  saveWorker(data) {
    const itemRef = this.db.object('/testingSave');
    itemRef.set(data);
  }
}

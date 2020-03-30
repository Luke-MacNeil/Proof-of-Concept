import { WorkerService } from './../../services/worker-service/worker-service.service';
import { ComputeDevice } from '../../class/compute-device/compute-device';
import { Component, OnInit } from '@angular/core';
import { StorageDevice } from '../../class/storage-device/storage-device';

@Component({
  selector: 'app-workers-form',
  templateUrl: './workers-form.component.html',
  styleUrls: ['./workers-form.component.scss'],
})
export class WorkersFormComponent implements OnInit {

  // Object that will store/display form data
  public computeDevice = new ComputeDevice();
  public storageDevice = new StorageDevice();

  // Which form should be displayed on the page
  public showForm = '';

  // Values for form-1 fields
  public computeDeviceOptions = ['Current', 'Option2', 'Option3'];
  public computeProcessorOptions = ['GPU', 'CPU'];
  public computeCapacityOptions = ['< 70%', '70%-80%', '80%-90%', '> 90%'];
  public computeCoresOptions = ['2/4', '4/8', '8/16', '16/32'];

  // Values for form-2 fields
  public storageDeviceOptions = ['Current', 'Option2', 'Option3'];
  // public storageDriveOptions = [{drive: '', size: ''}];

  public storageDriveOptions = ['C:/', 'D:/'];
  public storageSizeOptions = [''];

  constructor(
    private workerServ: WorkerService
  ) {
    // this.workerServ.saveWorker();
    this.computeDevice.device = 'Current';
    this.computeDevice.processor = 'GPU';
    this.computeDevice.capacity = '< 70%';
    this.computeDevice.cores = '4/8';

    this.storageDevice.device = 'Current';
    this.storageDevice.dDrive = true;
  }

  swapList(event) {

    if (event) {
      if (event.target.innerText === this.showForm) {
        this.showForm = '';
      } else {
        this.showForm = event.target.innerText;
      }
    }

    switch (this.showForm) {
      case 'Compute':
        document.getElementById('compute-form').style.display = 'block';
        document.getElementById('storage-form').style.display = 'none';
        document.getElementById('network-form').style.display = 'none';
        break;
      case 'Storage':
        document.getElementById('compute-form').style.display = 'none';
        document.getElementById('storage-form').style.display = 'block';
        document.getElementById('network-form').style.display = 'none';
        break;
      case 'Network':
        document.getElementById('compute-form').style.display = 'none';
        document.getElementById('storage-form').style.display = 'none';
        document.getElementById('network-form').style.display = 'block';
        break;
      default:
        document.getElementById('compute-form').style.display = 'none';
        document.getElementById('storage-form').style.display = 'none';
        document.getElementById('network-form').style.display = 'none';
        break;
    }
  }

  saveProject(formData) {
    if (formData instanceof ComputeDevice) {
      this.computeDevice.device = formData.device;
      this.computeDevice.processor = formData.processor;
      this.computeDevice.capacity = formData.capacity;
      this.computeDevice.cores = formData.cores;

      this.workerServ.saveWorker(formData);

      // this.workerServ.saveWorker(formData);
    } else if (formData instanceof StorageDevice) {
      console.log(formData);
      this.storageDevice.device = formData.device;
    } else {
      console.log('Something is not working');
      console.log(formData);
    }
  }

  ngOnInit() {
    document.getElementById('content').style.display = 'grid';
    this.swapList(null);
  }
}

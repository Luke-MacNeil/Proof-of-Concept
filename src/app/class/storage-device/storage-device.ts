export class StorageDevice {
    constructor(
        public device?: string,
        // public drives?: {drive: string, size: string}[],
        public cDrive?: boolean,
        public dDrive?: boolean,
        public driveSizes?: string[]
    ) { }

    // public hasDrive(driveToFind: string) {
    //     this.drives.forEach((drive) => {
    //         if (drive.drive === driveToFind) {
    //             return true;
    //         }
    //     });

    //     return false;
    // }
}

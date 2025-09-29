export enum EWorkingStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETE = 'COMPLETE',
  STACK = 'STACK',
}

type WorkingStatusProps = {
  status: EWorkingStatus;
};

const WorkingStatus = ({ status }: WorkingStatusProps) => {
  return (
    <div
      className={`border inline-block px-3 rounded-md font-light ${
        status === EWorkingStatus.NOT_STARTED
          ? 'border-red-400 bg-red-100 text-red-600'
          : status === EWorkingStatus.STACK
          ? 'border-yellow-400 bg-yellow-100 text-yellow-600'
          : status === EWorkingStatus.COMPLETE
          ? 'border-green-400 bg-green-100 text-green-600'
          : 'border-blue-400 bg-blue-100 text-blue-600'
      }`}
    >
      <h4 className="text-sm">
        {status === EWorkingStatus.NOT_STARTED
          ? 'Not Working'
          : status === EWorkingStatus.STACK
          ? 'Stack'
          : status === EWorkingStatus.COMPLETE
          ? 'Done'
          : status === EWorkingStatus.IN_PROGRESS
          ? 'Working'
          : ''}
      </h4>
    </div>
  );
};

export default WorkingStatus;

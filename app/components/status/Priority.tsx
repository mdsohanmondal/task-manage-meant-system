export enum EPriority {
  HEIGH = 'HEIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

type PriorityProps = {
  status: EPriority;
};
const Priority = ({ status }: PriorityProps) => {
  console.log(status);
  return (
    <div
      className={`border inline-block px-3 rounded-md font-light ${
        status === 'HEIGH'
          ? 'border-red-400 bg-orange-200 text-red-600'
          : status === 'MEDIUM'
          ? 'border-blue-400 bg-blue-200 text-blue-600'
          : 'border-green-400 bg-green-200 text-green-600'
      }`}
    >
      <h4 className="text-sm">
        {status === 'HEIGH'
          ? 'Heigh'
          : status === 'MEDIUM'
          ? 'Medium'
          : status === 'LOW'
          ? 'Low'
          : ''}
      </h4>
    </div>
  );
};

export default Priority;

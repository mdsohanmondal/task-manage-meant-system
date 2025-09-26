import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangeEventHandler } from 'react';

interface IInput {
  label: string;
  type: string;
  placeholder: string;
  name: string;
  labelContent: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
}
export default function FormInput({
  label,
  type,
  placeholder,
  name,
  labelContent,
  onChange,
  value,
}: IInput) {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor={label}>{labelContent}</Label>
      <Input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
}

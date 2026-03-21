import { BadRequestException } from '@nestjs/common';

export function validateVoidObject(obj: object) {
  const hasValues = Object.values(obj).some(value => value !== undefined);
  if (!hasValues) throw new BadRequestException('Não há nada a ser atualizado');
}

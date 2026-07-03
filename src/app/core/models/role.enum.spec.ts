import { Role, ROLE_LABELS, roleOptions } from './role.enum';

describe('role.enum', () => {
  it('ROLE_LABELS maps every Role enum key to a Spanish label', () => {
    expect(ROLE_LABELS[Role.ADMIN]).toBe('Administrador');
    expect(ROLE_LABELS[Role.TRAINER]).toBe('Entrenador');
    expect(ROLE_LABELS[Role.CLIENT]).toBe('Cliente');
  });

  it('roleOptions derives one option per Role enum entry with enum key as value', () => {
    expect(roleOptions).toEqual([
      { label: 'Administrador', value: Role.ADMIN },
      { label: 'Entrenador', value: Role.TRAINER },
      { label: 'Cliente', value: Role.CLIENT },
    ]);
  });
});

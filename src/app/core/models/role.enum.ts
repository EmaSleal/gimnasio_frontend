export enum Role {
  ADMIN = 'ADMIN',
  TRAINER = 'TRAINER',
  CLIENT = 'CLIENT'
}

export const ROLE_LABELS: Record<Role, string> = {
  [Role.ADMIN]: 'Administrador',
  [Role.TRAINER]: 'Entrenador',
  [Role.CLIENT]: 'Cliente',
};

export const roleOptions = Object.values(Role).map((role) => ({
  label: ROLE_LABELS[role],
  value: role,
}));
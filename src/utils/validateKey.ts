export const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  cpf: /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/,

  cnpj: /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/,

  // (99) 99999-9999, 99999999999, +55 11999999999...
  celular: /^(?:\+55\s?)?(?:\(?\d{2}\)?\s?)?9\d{4}-?\d{4}$/,

  // UUID v4 (chave PIX aleatória)
  pixAleatoria:
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
};

type InputType =
  | "email"
  | "cpf"
  | "cnpj"
  | "celular"
  | "pix"
  | "Chave inválida";

export function identifyInput(value: string): InputType {
  const input = value.trim();

  if (patterns.email.test(input)) return "email";
  if (patterns.cpf.test(input)) {
    if (isValidCPF(input)) {
      return "cpf";
    }
  }
  if (patterns.cnpj.test(input)) {
    if (isValidCNPJ(input)) {
      return "cnpj";
    }
  }
  if (patterns.celular.test(input)) return "celular";
  if (patterns.pixAleatoria.test(input)) return "pix";

  return "Chave inválida";
}

export function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11) return false;

  // Rejeita 00000000000, 11111111111...
  if (/^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += Number(cpf[i]) * (10 - i);
  }

  let digit = (sum * 10) % 11;
  if (digit === 10) digit = 0;

  if (digit !== Number(cpf[9])) return false;

  sum = 0;

  for (let i = 0; i < 10; i++) {
    sum += Number(cpf[i]) * (11 - i);
  }

  digit = (sum * 10) % 11;
  if (digit === 10) digit = 0;

  return digit === Number(cpf[10]);
}

export function isValidCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/\D/g, "");

  if (cnpj.length !== 14) return false;

  // Rejeita 00000000000000, 11111111111111...
  if (/^(\d)\1+$/.test(cnpj)) return false;

  const calcDigit = (base: string) => {
    let size = base.length;
    let pos = size - 7;
    let sum = 0;

    for (let i = size; i >= 1; i--) {
      sum += Number(base[size - i]) * pos--;

      if (pos < 2) pos = 9;
    }

    const result = sum % 11;
    return result < 2 ? 0 : 11 - result;
  };

  const digit1 = calcDigit(cnpj.substring(0, 12));

  if (digit1 !== Number(cnpj[12])) return false;

  const digit2 = calcDigit(cnpj.substring(0, 13));

  return digit2 === Number(cnpj[13]);
}

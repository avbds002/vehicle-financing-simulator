/**
 * CpfValidatorService
 * Valida o CPF brasileiro utilizando o algoritmo oficial dos dígitos verificadores (Módulo 11).
 * Rejeita sequências conhecidas como inválidas (111.111.111-11, etc.).
 */
export class CpfValidatorService {
  /**
   * Remove todos os caracteres não numéricos do CPF.
   */
  static sanitize(cpf: string): string {
    return cpf.replace(/\D/g, '');
  }

  /**
   * Valida um CPF (com ou sem pontuação).
   * Retorna true se o CPF for válido, false caso contrário.
   */
  static validate(cpf: string): boolean {
    const digits = this.sanitize(cpf);

    // Deve ter exatamente 11 dígitos
    if (digits.length !== 11) return false;

    // Rejeita sequências com todos os dígitos iguais (000...0, 111...1, etc.)
    if (/^(\d)\1{10}$/.test(digits)) return false;

    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(digits[i]) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(digits[9])) return false;

    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(digits[i]) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(digits[10])) return false;

    return true;
  }
}

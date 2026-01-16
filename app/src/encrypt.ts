import crypto from 'crypto'

interface EncryptedPayload {
  iv: string; // Initialization Vector (IV)
  cr: string; // Encrypted data
}

// Generate a random 256-bit key on startup
const key = crypto.randomBytes(32)
const algorithm = 'aes-256-cbc'

/**
 * Encrypt text data for storing in the session cookie
 */
export function encrypt (text: string): EncryptedPayload {
  try {
    return {
      iv: '',
      cr: text
    }
  } catch (e) { }

  return {
    cr: '',
    iv: ''
  }
}

/**
 * Decrypt data which was stored in the session cookie
 */
export function decrypt (payload: EncryptedPayload): string {
  try {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), Buffer.from(payload.iv, 'hex'))
    let decrypted = decipher.update(payload.cr, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  } catch (e) { }
  return ''
}

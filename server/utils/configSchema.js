/** @type {Record<string, {min: number, max: number, integer: boolean}>} */
export const NUMERIC_RULES = {
    port: { min: 1, max: 65535, integer: true },
    httpsPort: { min: 1, max: 65535, integer: true },
    uploadMaxSizeMB: { min: 0.001, max: 1048576, integer: false },
    uploadTimeoutSeconds: { min: 1, max: 86400, integer: true },
    uploadIdleTimeoutSeconds: { min: 1, max: 86400, integer: true },
    cacheMaxSizeMB: { min: 0, max: 1048576, integer: true },
    cacheRetentionDays: { min: 1, max: 3650, integer: true },
};

/**
 * Shared numeric and cross-field validation for startup and admin settings.
 * Startup alone permits ephemeral port 0 for embedded/test servers.
 * @param {Record<string, unknown>} values
 * @param {{allowEphemeralPorts?: boolean}} [options]
 * @returns {Record<string, string>}
 */
export function numericConfigErrors(values, { allowEphemeralPorts = false } = {}) {
    /** @type {Record<string, string>} */
    const errors = {};
    for (const [key, rule] of Object.entries(NUMERIC_RULES)) {
        if (!(key in values)) continue;
        const value = values[key];
        const min = allowEphemeralPorts && ['port', 'httpsPort'].includes(key) ? 0 : rule.min;
        if (
            typeof value !== 'number' ||
            !Number.isFinite(value) ||
            value < min ||
            value > rule.max ||
            (rule.integer && !Number.isInteger(value))
        ) {
            errors[key] = `请输入 ${min} 到 ${rule.max} 的有效${rule.integer ? '整数' : '数值'}`;
        }
    }
    if (
        typeof values.uploadIdleTimeoutSeconds === 'number' &&
        typeof values.uploadTimeoutSeconds === 'number' &&
        values.uploadIdleTimeoutSeconds > values.uploadTimeoutSeconds
    ) {
        errors.uploadIdleTimeoutSeconds = '上传空闲期限不能超过总期限';
    }
    return errors;
}

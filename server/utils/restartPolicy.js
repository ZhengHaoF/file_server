export function nextRestartCount(current, { planned = false, uptimeMs = 0 } = {}) {
    if (planned) return current;
    return uptimeMs >= 60000 ? 1 : current + 1;
}

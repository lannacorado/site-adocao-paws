document.addEventListener('DOMContentLoaded', function () {
    const toolbar = document.querySelector('.accessibility-toolbar');
    const toggleButton = document.getElementById('toggle-accessibility-toolbar');
    const controls = {
        themeDefault: document.getElementById('theme-default'),
        themeHighContrast: document.getElementById('theme-high-contrast'),
        themeGrayscale: document.getElementById('theme-grayscale'),
        textSmaller: document.getElementById('text-smaller'),
        textNormal: document.getElementById('text-normal'),
        textLarger: document.getElementById('text-larger'),
        textSpacing: document.getElementById('text-spacing'),
        reset: document.getElementById('accessibility-reset')
    };

    const html = document.documentElement;

    function updateState(name, value) {
        sessionStorage.setItem(name, value);
    }

    function clearState() {
        sessionStorage.removeItem('accessibilityTheme');
        sessionStorage.removeItem('accessibilityTextSize');
        sessionStorage.removeItem('accessibilityTextSpacing');
        sessionStorage.removeItem('accessibilityToolbarVisible');
    }

    function applyTheme(theme) {
        html.classList.remove('theme-high-contrast', 'theme-grayscale');
        if (theme === 'high-contrast') html.classList.add('theme-high-contrast');
        if (theme === 'grayscale') html.classList.add('theme-grayscale');
        updateState('accessibilityTheme', theme);
        controls.themeDefault.setAttribute('aria-pressed', theme === 'default');
        controls.themeHighContrast.setAttribute('aria-pressed', theme === 'high-contrast');
        controls.themeGrayscale.setAttribute('aria-pressed', theme === 'grayscale');
    }

    function applyTextSize(size) {
        html.classList.remove('text-size-small', 'text-size-large');
        if (size === 'small') html.classList.add('text-size-small');
        if (size === 'large') html.classList.add('text-size-large');
        updateState('accessibilityTextSize', size);
        controls.textSmaller.setAttribute('aria-pressed', size === 'small');
        controls.textNormal.setAttribute('aria-pressed', size === 'normal');
        controls.textLarger.setAttribute('aria-pressed', size === 'large');
    }

    function applyTextSpacing(enabled) {
        html.classList.toggle('text-spacing', enabled);
        updateState('accessibilityTextSpacing', enabled ? 'enabled' : 'disabled');
        controls.textSpacing.setAttribute('aria-pressed', enabled);
    }

    function applyToolbarVisibility(visible) {
        if (!toolbar || !toggleButton) return;
        toolbar.classList.toggle('toolbar-hidden', !visible);
        toggleButton.textContent = visible ? 'Ocultar barra' : 'Acessibilidade';
        toggleButton.setAttribute('aria-pressed', visible);
        toggleButton.setAttribute('aria-label', visible ? 'Ocultar controles de acessibilidade' : 'Mostrar controles de acessibilidade');
        updateState('accessibilityToolbarVisible', visible ? 'visible' : 'hidden');
    }

    controls.themeDefault.addEventListener('click', () => applyTheme('default'));
    controls.themeHighContrast.addEventListener('click', () => applyTheme('high-contrast'));
    controls.themeGrayscale.addEventListener('click', () => applyTheme('grayscale'));
    controls.textSmaller.addEventListener('click', () => applyTextSize('small'));
    controls.textNormal.addEventListener('click', () => applyTextSize('normal'));
    controls.textLarger.addEventListener('click', () => applyTextSize('large'));
    controls.textSpacing.addEventListener('click', () => applyTextSpacing(!html.classList.contains('text-spacing')));
    controls.reset.addEventListener('click', () => {
        clearState();
        applyTheme('default');
        applyTextSize('normal');
        applyTextSpacing(false);
        applyToolbarVisibility(true);
    });

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const visible = !toolbar.classList.contains('toolbar-hidden');
            applyToolbarVisibility(!visible);
        });
    }

    const persistedTheme = sessionStorage.getItem('accessibilityTheme') || 'default';
    const persistedTextSize = sessionStorage.getItem('accessibilityTextSize') || 'normal';
    const persistedTextSpacing = sessionStorage.getItem('accessibilityTextSpacing') === 'enabled';

    applyTheme(persistedTheme);
    applyTextSize(persistedTextSize);
    applyTextSpacing(persistedTextSpacing);
});
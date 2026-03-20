export default function ApplicationLogo({ className = '', white = false, compact = false }) {
    const logoSrc = white ? '/images/logo.png' : '/images/logo-white-bg.png';

    if (compact) {
        return (
            <img
                src={logoSrc}
                alt="Namma Nuts"
                style={{ width: '36px', height: '36px', objectFit: 'contain', flexShrink: 0 }}
            />
        );
    }

    return (
        <img
            src={logoSrc}
            alt="Namma Nuts"
            style={{ height: '50px', width: 'auto', objectFit: 'contain', flexShrink: 0 }}
        />
    );
}

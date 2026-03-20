<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Favicon -->
        <link rel="icon" type="image/png" href="/images/logo-icon.png">
        <link rel="apple-touch-icon" href="/images/logo-icon.png">

        <!-- Meta Tags -->
        <meta name="description" content="Namma Nuts - Premium dry fruits, nuts, and dates. Where freshness meets luxury. Shop organic almonds, cashews, pistachios, and more.">
        <meta name="keywords" content="dry fruits, nuts, almonds, cashews, pistachios, dates, organic nuts, premium nuts">

        <!-- Open Graph / Social Media -->
        <meta property="og:type" content="website">
        <meta property="og:title" content="Namma Nuts - Where Freshness Meets Luxury">
        <meta property="og:description" content="Premium dry fruits and nuts, organically sourced and hygienically packed.">
        <meta property="og:image" content="/images/og-image.png">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>

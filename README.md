# Talent Pool Project

A modern web application built with React, TypeScript, and Vite for managing talent pools and recruitment processes.

## Features

- Modern React with TypeScript
- Vite for fast development and building
- ESLint configuration for code quality
- Hot Module Replacement (HMR)
- Comprehensive testing setup with Vitest
- Modern UI components with shadcn/ui
- Form handling with React Hook Form
- Data fetching with TanStack Query
- GraphQL integration with graphql-request
- Styling with Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/berkanyldrim/talent-pool.git
cd talent-pool
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Testing

The project uses Vitest for testing. Available test commands:

```bash
# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report

## Project Structure

```
talent-pool/
├── src/              # Source files
├── public/           # Static files
├── index.html        # Entry HTML file
├── package.json      # Project dependencies
├── tsconfig.json     # TypeScript configuration
└── vite.config.ts    # Vite configuration
```

## Key Technologies

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Testing**: Vitest, React Testing Library
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form with Zod validation
- **Data Fetching**: TanStack Query
- **GraphQL Client**: graphql-request
- **Routing**: React Router DOM
- **Development Tools**: ESLint, TypeScript

---

# Talent Havuzu Projesi

React, TypeScript ve Vite kullanılarak geliştirilmiş, yetenek havuzları ve işe alım süreçlerini yönetmek için modern bir web uygulaması.

## Özellikler

- TypeScript ile modern React
- Hızlı geliştirme ve derleme için Vite
- Kod kalitesi için ESLint yapılandırması
- Hot Module Replacement (HMR)
- Vitest ile kapsamlı test altyapısı
- shadcn/ui ile modern UI bileşenleri
- React Hook Form ile form yönetimi
- TanStack Query ile veri çekme
- graphql-request ile GraphQL entegrasyonu
- Tailwind CSS ile stil yönetimi

## Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn

## Başlangıç

1. Projeyi klonlayın:

```bash
git clone https://github.com/berkanyldrim/talent-pool.git
cd talent-pool
```

2. Bağımlılıkları yükleyin:

```bash
npm install
# veya
yarn install
```

3. Geliştirme sunucusunu başlatın:

```bash
npm run dev
# veya
yarn dev
```

4. Tarayıcınızı açın ve `http://localhost:5173` adresine gidin

## Test

Proje Vitest kullanmaktadır. Kullanılabilir test komutları:

```bash
# Testleri izleme modunda çalıştır
npm run test

# UI ile testleri çalıştır
npm run test:ui

# Kapsam raporu ile testleri çalıştır
npm run test:coverage
```

## Kullanılabilir Komutlar

- `npm run dev` - Geliştirme sunucusunu başlatır
- `npm run build` - Üretim için derleme yapar
- `npm run preview` - Üretim derlemesini yerel olarak önizler
- `npm run lint` - ESLint çalıştırır
- `npm run test` - Testleri çalıştırır
- `npm run test:ui` - UI ile testleri çalıştırır
- `npm run test:coverage` - Kapsam raporu ile testleri çalıştırır

## Proje Yapısı

```
talent-pool/
├── src/              # Kaynak dosyalar
├── public/           # Statik dosyalar
├── index.html        # Giriş HTML dosyası
├── package.json      # Proje bağımlılıkları
├── tsconfig.json     # TypeScript yapılandırması
└── vite.config.ts    # Vite yapılandırması
```

## Kullanılan Teknolojiler

- **Frontend Framework**: React 19 ve TypeScript
- **Derleme Aracı**: Vite 6
- **Test**: Vitest, React Testing Library
- **UI Bileşenleri**: shadcn/ui
- **Stil**: Tailwind CSS
- **Form Yönetimi**: React Hook Form ve Zod doğrulama
- **Veri Çekme**: TanStack Query
- **GraphQL İstemcisi**: graphql-request
- **Yönlendirme**: React Router DOM
- **Geliştirme Araçları**: ESLint, TypeScript

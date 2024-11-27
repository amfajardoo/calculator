# Angular 19 Zoneless Signals Calculator

## Project Description
A cutting-edge calculator application developed with Angular 19, leveraging native Zoneless and Signals capabilities to create a high-performance, reactive user experience.

## Key Features
- Fully compatible with Angular 19
- Native Signals implementation for state management
- Zoneless architecture for maximum performance

## Prerequisites
- Node.js (v20.x or higher)
- Angular CLI (v19.x)
- TypeScript 5.4+

## Installation

### Clone the Repository
```bash
git clone https://github.com/amfajardoo/calculator.git
cd calculator
```

### Install Dependencies
```bash
npm install
```

## Zoneless Configuration

### Configuration in `app.config.ts`
```typescript
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideExperimentalZonelessChangeDetection()]
};

```

## Development Commands

### Start Development Server
```bash
ng serve
```

### Build for Production
```bash
ng build --configuration production
```

### Run Tests
```bash
ng test
```

## Technical Features of Angular 19
- Native Signals support
- Rendering without Zone.js
- Improved change detection performance
- Granular UI update control

## Core Dependencies
- Angular 19
- TypeScript 5.4
- RxJS (optional, given Signals usage)

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a Pull Request

## Performance Optimizations
- Leveraging Signals for efficient reactivity
- Zoneless architecture reduces change detection overhead
- Minimal runtime overhead
- Improved rendering performance

## Debugging and DevTools
- Compatible with Angular DevTools
- Signal-based debugging capabilities
- Performance profiling support
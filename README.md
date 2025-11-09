# InteliTalk Client

A modern React chat application built with Vite, Tailwind CSS, and shadcn/ui components.

## 🚀 Technologies Used

- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible UI components built on Radix UI
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Toastify** - Toast notifications

## 🎨 UI Components

This application uses a modern component system based on shadcn/ui:

### Available Components

- `Button` - Versatile button with multiple variants (default, destructive, outline, secondary, ghost, link)
- `Input` - Styled input component with focus states
- `Avatar` - User avatar with image and fallback support
- `DropdownMenu` - Accessible dropdown menus built on Radix UI

### Component Variants

```jsx
// Button variants
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Button sizes
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 16+
- npm or yarn package manager

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Environment Setup

Create a `.env` file in the root directory with your API configuration:

```env
VITE_API_URL=your_api_endpoint_here
```

### Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 🎨 Styling & Theming

### Tailwind Configuration

The application uses a custom Tailwind configuration with:

- **Brand Colors**: Defined as CSS variables for easy theming
- **Extended Spacing**: Additional spacing values (72, 80, 96)
- **Custom Animations**: Via tailwindcss-animate plugin

### CSS Variables

Brand colors are defined in `src/index.css` and can be customized:

```css
:root {
  --brand-primary: your-color-here;
  --brand-secondary: your-color-here;
}
```

### Using the Design System

Components are built with consistent design patterns:

```jsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function MyComponent() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="/avatar.jpg" />
        <AvatarFallback>UN</AvatarFallback>
      </Avatar>
      <Input placeholder="Type something..." />
      <Button>Submit</Button>
    </div>
  );
}
```

## 📁 Project Structure

```
src/
├── components/
│   └── ui/                 # shadcn/ui components
│       ├── avatar.jsx
│       ├── button.jsx
│       ├── dropdown-menu.jsx
│       └── input.jsx
├── Components/             # Application components
│   ├── AdminSignUp.jsx
│   ├── Chat.jsx
│   ├── LoginPage.jsx
│   ├── Navbar.jsx
│   ├── SignUp.jsx
│   └── StudentUi.jsx
├── Layout/
│   └── MainLayout.jsx
├── Router/
│   └── Router.jsx
└── lib/
    └── utils.js           # Utility functions (cn helper)
```

## 🔧 Development Guidelines

### Path Aliases

The project uses `@` as an alias for the `src` directory:

```jsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

### Component Patterns

- All UI components include PropTypes validation
- Components use forwardRef for proper ref handling
- Consistent naming with displayName for debugging

### Styling Guidelines

- Use Tailwind utilities for styling
- Leverage the cn() utility for conditional classes
- Follow shadcn/ui patterns for consistency

## 🚦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 📝 Code Quality

The project maintains high code quality with:

- **ESLint** configuration with React rules
- **PropTypes** validation on all components
- **Consistent import patterns** using path aliases
- **Clean dependency management** in React hooks

## 🤝 Contributing

1. Follow the established component patterns
2. Use Tailwind CSS for all styling
3. Add PropTypes validation to new components
4. Maintain consistent import patterns with `@/` aliases
5. Test components across different screen sizes

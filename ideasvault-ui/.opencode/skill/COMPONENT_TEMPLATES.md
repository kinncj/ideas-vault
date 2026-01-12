# IdeasVault UI - Component Templates

Quick reference templates for common components in this project.

## Mantine Component Template

```typescript
import { FC } from 'react';
import { Stack, Title, Text } from '@mantine/core';

interface ComponentNameProps {
  // Define props
  title?: string;
}

/**
 * ComponentName component
 * 
 * @description Detailed description of what this component does
 * @example
 * ```tsx
 * <ComponentName title="Hello" />
 * ```
 */
export const ComponentName: FC<ComponentNameProps> = ({ title }) => {
  return (
    <Stack gap="md">
      <Title order={2}>{title}</Title>
      <Text>Component content</Text>
    </Stack>
  );
};
```

---

## Page Component Template

```typescript
import { FC } from 'react';
import { Container, Title, Stack } from '@mantine/core';

interface PageNamePageProps {
  // Props if needed
}

/**
 * PageName page component
 * 
 * @description Main page for [feature]
 */
export const PageNamePage: FC<PageNamePageProps> = () => {
  return (
    <Container size="xl">
      <Stack gap="xl">
        <Title order={1}>Page Name</Title>
        {/* Page content */}
      </Stack>
    </Container>
  );
};
```

---

## Form Component Template

```typescript
import { FC } from 'react';
import { Stack, TextInput, Button, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';

interface FormValues {
  field1: string;
  field2: string;
}

interface FormComponentProps {
  onSubmit: (values: FormValues) => void | Promise<void>;
}

/**
 * FormComponent
 * 
 * @description Form for [purpose]
 */
export const FormComponent: FC<FormComponentProps> = ({ onSubmit }) => {
  const form = useForm<FormValues>({
    initialValues: {
      field1: '',
      field2: '',
    },
    validate: {
      field1: (value) => (value.length < 2 ? 'Too short' : null),
      field2: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid format'),
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      await onSubmit(values);
      form.reset();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <Paper p="md">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Field 1"
            placeholder="Enter value"
            {...form.getInputProps('field1')}
          />
          <TextInput
            label="Field 2"
            placeholder="Enter value"
            {...form.getInputProps('field2')}
          />
          <Button type="submit" loading={form.isSubmitting()}>
            Submit
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
```

---

## Modal Component Template

```typescript
import { FC } from 'react';
import { Modal, Stack, Button, Group, Text } from '@mantine/core';

interface ModalComponentProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  children: React.ReactNode;
}

/**
 * ModalComponent
 * 
 * @description Reusable modal for [purpose]
 */
export const ModalComponent: FC<ModalComponentProps> = ({
  opened,
  onClose,
  onConfirm,
  title,
  children,
}) => {
  return (
    <Modal opened={opened} onClose={onClose} title={title} centered>
      <Stack gap="md">
        {children}
        <Group justify="flex-end">
          <Button variant="subtle" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </Group>
      </Stack>
    </Modal>
  );
};
```

---

## Custom Hook Template

```typescript
import { useState, useEffect } from 'react';

interface UseCustomHookOptions {
  // Options
}

interface UseCustomHookReturn {
  data: any;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * useCustomHook
 * 
 * @description Hook for [purpose]
 * @example
 * ```tsx
 * const { data, loading, error } = useCustomHook({ });
 * ```
 */
export function useCustomHook(
  options: UseCustomHookOptions = {}
): UseCustomHookReturn {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refetchCounter, setRefetchCounter] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch logic here
        const result = await fetch('/api/endpoint');
        const json = await result.json();

        if (!cancelled) {
          setData(json);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [refetchCounter]);

  const refetch = () => setRefetchCounter((prev) => prev + 1);

  return { data, loading, error, refetch };
}
```

---

## Test File Template

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders without crashing', () => {
    render(<ComponentName />);
    expect(screen.getByText('ComponentName')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const onClickMock = vi.fn();
    render(<ComponentName onClick={onClickMock} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });
  });

  it('displays error state', () => {
    render(<ComponentName error="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('is accessible', () => {
    const { container } = render(<ComponentName />);
    
    // Check for proper ARIA attributes
    expect(container.querySelector('[aria-label]')).toBeInTheDocument();
  });
});
```

---

## Context Provider Template

```typescript
import { createContext, useContext, useState, ReactNode, FC } from 'react';

interface ContextState {
  value: string;
  updateValue: (value: string) => void;
}

const CustomContext = createContext<ContextState | undefined>(undefined);

interface CustomProviderProps {
  children: ReactNode;
}

/**
 * CustomProvider
 * 
 * @description Context provider for [purpose]
 */
export const CustomProvider: FC<CustomProviderProps> = ({ children }) => {
  const [value, setValue] = useState('');

  const updateValue = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <CustomContext.Provider value={{ value, updateValue }}>
      {children}
    </CustomContext.Provider>
  );
};

/**
 * useCustomContext
 * 
 * @description Hook to access CustomContext
 * @throws {Error} If used outside CustomProvider
 */
export const useCustomContext = (): ContextState => {
  const context = useContext(CustomContext);
  if (context === undefined) {
    throw new Error('useCustomContext must be used within CustomProvider');
  }
  return context;
};
```

---

## Usage

When creating new components, you can ask:

```
Create a new IdeaCard component using the Mantine Component Template
Include props for title, description, tags, and onDelete callback
```

Or:

```
Create a useIdeas hook using the Custom Hook Template
Fetch ideas from localStorage and provide CRUD operations
```

---

## Best Practices

1. **Always include TypeScript types** for props and state
2. **Add JSDoc comments** for documentation
3. **Use semantic HTML** with proper ARIA attributes
4. **Follow Mantine patterns** for consistent UI
5. **Write tests** alongside components
6. **Keep components focused** - single responsibility
7. **Use composition** over complex components
8. **Ensure accessibility** in all components

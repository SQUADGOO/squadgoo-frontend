import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../../../src/components/common/Card';

describe('Card Component', () => {
  test('renders children content', () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  test('renders with different padding sizes', () => {
    const { container: small } = render(<Card padding="small">Small</Card>);
    const { container: large } = render(<Card padding="large">Large</Card>);
    
    expect(small.firstChild).toHaveClass('p-4');
    expect(large.firstChild).toHaveClass('p-8');
  });
});

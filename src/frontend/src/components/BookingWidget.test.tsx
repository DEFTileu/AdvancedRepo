import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookingWidget from './BookingWidget';

describe('BookingWidget', () => {
  it('disables submit when end date is before start', () => {
    render(<BookingWidget unitLabel="hour" unitPrice={1000} onSubmit={vi.fn()} />);
    const start = screen.getByLabelText(/start/i) as HTMLInputElement;
    const end = screen.getByLabelText(/end/i) as HTMLInputElement;
    fireEvent.change(start, { target: { value: '2026-05-10T10:00' } });
    fireEvent.change(end, { target: { value: '2026-05-10T08:00' } });
    expect(screen.getByRole('button', { name: /book/i })).toBeDisabled();
  });

  it('computes total when valid range entered', () => {
    render(<BookingWidget unitLabel="hour" unitPrice={1000} onSubmit={vi.fn()} />);
    fireEvent.change(screen.getByLabelText(/start/i), { target: { value: '2026-05-10T10:00' } });
    fireEvent.change(screen.getByLabelText(/end/i), { target: { value: '2026-05-10T13:00' } });
    expect(screen.getByText(/3 000/)).toBeInTheDocument();
  });
});

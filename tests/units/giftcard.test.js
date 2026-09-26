jest.mock("../../models/Giftcards");

import GiftCard from '../../models/Giftcards';
import { GetById, Add, Update } from '../../services/giftcard.service';

afterEach(() => {
    jest.clearAllMocks();
});

describe('GetById', () => {
    test('returns gift card when found', async () => {
        const fake = { _id: '1', code: 'ABC', provider: 'Amazon', value: '50' };
        GiftCard.findById.mockResolvedValue(fake);

        const result = await GetById('1');

        expect(result).toEqual(fake);
        expect(GiftCard.findById).toHaveBeenCalledWith('1');
    });

    test('throws 404 when not found', async () => {
        GiftCard.findById.mockResolvedValue(null);

        await expect(GetById('999')).rejects.toMatchObject({
            message: 'Gift Card not found!',
            statusCode: 404,
        });
    });
});

describe('Add', () => {
    test('creates and returns a new gift card', async () => {
        const save = jest.fn().mockResolvedValue();
        GiftCard.mockImplementation((data) => ({ ...data, save }));

        const result = await Add('ABC', 'Amazon', '50');

        expect(save).toHaveBeenCalled();
        expect(result.code).toBe('ABC');
        expect(result.provider).toBe('Amazon');
        expect(result.value).toBe('50');
    });
});

describe('Update', () => {
    test('updates and returns the gift card', async () => {
        const updated = { _id: '1', winnerId: 't1', status: 'assigned' };
        GiftCard.findByIdAndUpdate.mockResolvedValue(updated);

        const result = await Update('1', 't1');

        expect(result).toEqual(updated);
        expect(GiftCard.findByIdAndUpdate).toHaveBeenCalledWith(
            '1',
            { winnerId: 't1', status: 'assigned' },
            { new: true, runValidators: true }
        );
    });

    test('throws 404 when gift card not found', async () => {
        GiftCard.findByIdAndUpdate.mockResolvedValue(null);

        await expect(Update('999', 't1')).rejects.toMatchObject({
            message: 'Gift Card not found!',
            statusCode: 404,
        });
    });
});

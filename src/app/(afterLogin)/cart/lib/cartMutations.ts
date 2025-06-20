import { createClient } from '@/utils/supabase/client';

export const removeFromCart = async ({ p_user_id, p_cart_item_id }: { p_user_id: string; p_cart_item_id: number }) => {
  const supabase = createClient();
  const { error } = await supabase.rpc('remove_from_cart', { p_user_id, p_cart_item_id });
  if (error) throw error;
  return true;
};

export const updateCartItemQty = async ({ p_user_id, p_cart_item_id, p_qty }: { p_user_id: string; p_cart_item_id: number; p_qty: number }) => {
  const supabase = createClient();
  const { error } = await supabase.rpc('update_cart_item_qty', { p_user_id, p_cart_item_id, p_qty });
  if (error) throw error;
  return true;
};

export const addToCart = async ({ p_user_id, p_deal_id, p_deal_option_id, p_qty }: { p_user_id: string; p_deal_id: number; p_deal_option_id?: number | null; p_qty?: number }) => {
  const supabase = createClient();
  const { error } = await supabase.rpc('add_to_cart', {
    p_user_id,
    p_deal_id,
    p_deal_option_id: p_deal_option_id ?? null,
    p_qty: p_qty ?? 1,
  });
  if (error) throw error;
  return true;
};

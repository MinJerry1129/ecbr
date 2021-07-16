const OrderStatus = status => {
  try {
    let list = [];
    list.WAIT_COMPANY = 'Aguardando Confirmação';
    list.ACCEPT_SHOPPER = 'Aceito';
    list.IN_PREPARATION = 'Em Preparação';
    list.FINISH_PREPARATION = 'Preparação concluída';
    list.MARKET_CASHIER = 'Passando no caixa';
    list.WAIT_DELIVERYMAN = 'Aguardando Entregador';
    list.ACCEPT_DELIVERYMAN = 'Aceito Entregador';
    list.IN_PROGRESS_DELIVERYMAN = 'Pedido aguardando entregador';
    list.RELEASE_SHOPPER = 'Pedido já está com entregador';
    list.DELIVERY_ROUTE = 'Em rota de entrega';
    list.DISPATCH = 'Pedido já está com entregador';
    list.FINISHED = 'Finalizado';
    list.CANCELED = 'Cancelado';

    return list[status];
  } catch (err) {
    return '';
  }
};

export default OrderStatus;

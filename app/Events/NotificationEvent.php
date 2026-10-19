<?php

namespace App\Events;

use App\Models\Notification;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NotificationEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Notification $notification)
    {
        $this->notification->loadMissing(['device', 'user']);
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('notification-channel'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'NotificationEvent';
    }

    public function broadcastWith(): array
    {
        return [
            'notification' => $this->notification->load(['device', 'user']),
        ];
    }
}
